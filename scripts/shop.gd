extends Control

@onready var game_manager = $"/root/GameManager"
@onready var item_database = $"/root/ItemDatabase"
@onready var customer_database = $"/root/CustomerDatabase"

@onready var money_label = $UI/TopBar/MoneyLabel
@onready var day_label = $UI/TopBar/DayLabel
@onready var reputation_label = $UI/TopBar/ReputationLabel

@onready var inventory_grid = $UI/InventoryPanel/InventoryGrid
@onready var customer_panel = $UI/CustomerPanel
@onready var dialogue_box = $UI/DialogueBox

var current_customer: Dictionary = {}
var dialogue_index: int = 0

func _ready():
	game_manager.money_changed.connect(_on_money_changed)
	game_manager.day_changed.connect(_on_day_changed)

	# 连接按钮信号
	$UI/Controls/VBoxContainer/NextDayButton.pressed.connect(_on_next_day_button_pressed)
	$UI/Controls/VBoxContainer/SaveButton.pressed.connect(_on_save_button_pressed)
	$UI/Controls/VBoxContainer/MenuButton.pressed.connect(_on_menu_button_pressed)
	$UI/DialogueBox/NextButton.pressed.connect(_on_dialogue_next_clicked)

	update_ui()
	spawn_random_customer()

func update_ui():
	money_label.text = "金钱: $" + str(game_manager.player_money)
	day_label.text = "第 " + str(game_manager.current_day) + " 天"
	reputation_label.text = "声望: " + str(game_manager.shop_reputation)
	update_inventory_display()

func update_inventory_display():
	# 清空现有显示
	for child in inventory_grid.get_children():
		child.queue_free()

	# 显示库存物品
	for item_id in game_manager.inventory.keys():
		var item_data = item_database.get_item(item_id)
		var quantity = game_manager.inventory[item_id]

		var item_button = Button.new()
		item_button.text = item_data["name"] + " x" + str(quantity)
		item_button.pressed.connect(_on_item_clicked.bind(item_id))
		inventory_grid.add_child(item_button)

func spawn_random_customer():
	var available_customers = customer_database.get_available_customers(
		game_manager.current_day,
		game_manager.shop_reputation
	)

	if available_customers.size() == 0:
		return

	current_customer = available_customers[randi() % available_customers.size()]
	dialogue_index = 0
	show_dialogue()

func show_dialogue():
	if dialogue_index < current_customer["dialogue"].size():
		var dialogue_text = current_customer["dialogue"][dialogue_index]
		dialogue_box.get_node("NameLabel").text = current_customer["name"]
		dialogue_box.get_node("DialogueLabel").text = dialogue_text
		dialogue_box.visible = true
	else:
		show_customer_request()

func show_customer_request():
	customer_panel.visible = true
	var requested_items = current_customer["desired_items"]
	customer_panel.get_node("RequestLabel").text = "顾客想要: " + str(requested_items)

func _on_item_clicked(item_id: String):
	if current_customer.is_empty():
		return

	var desired_items = current_customer["desired_items"]
	if item_id in desired_items:
		# 交易成功
		game_manager.remove_from_inventory(item_id, 1)
		game_manager.add_money(current_customer["reward_money"])
		game_manager.shop_reputation += current_customer["reward_reputation"]

		show_success_message()
		current_customer = {}
		customer_panel.visible = false

		# 稍后生成新顾客
		await get_tree().create_timer(2.0).timeout
		spawn_random_customer()
	else:
		show_wrong_item_message()

func show_success_message():
	dialogue_box.get_node("DialogueLabel").text = "交易成功！顾客很满意！"

func show_wrong_item_message():
	dialogue_box.get_node("DialogueLabel").text = "这不是顾客想要的物品..."

func _on_money_changed(new_amount):
	money_label.text = "金钱: $" + str(new_amount)

func _on_day_changed(new_day):
	day_label.text = "第 " + str(new_day) + " 天"

func _on_next_day_button_pressed():
	game_manager.advance_day()
	update_ui()
	spawn_random_customer()

func _on_dialogue_box_clicked():
	dialogue_index += 1
	show_dialogue()

func _on_dialogue_next_clicked():
	dialogue_index += 1
	show_dialogue()

func _on_menu_button_pressed():
	game_manager.save_game()
	get_tree().change_scene_to_file("res://scenes/main_menu.tscn")

func _on_save_button_pressed():
	game_manager.save_game()
