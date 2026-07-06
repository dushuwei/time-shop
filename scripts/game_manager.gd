extends Node

signal money_changed(new_amount)
signal day_changed(new_day)
signal customer_served(customer_data)

var player_money: int = 100
var current_day: int = 1
var shop_reputation: int = 0
var inventory: Dictionary = {}
var unlocked_stories: Array = []

func _ready():
	load_game_data()
	# 添加测试物品
	if inventory.is_empty():
		add_to_inventory("cassette_tape", 2)
		add_to_inventory("hologram_toy", 1)
		add_to_inventory("pocket_watch", 1)
		add_to_inventory("polaroid_camera", 1)

func add_money(amount: int):
	player_money += amount
	emit_signal("money_changed", player_money)

func spend_money(amount: int) -> bool:
	if player_money >= amount:
		player_money -= amount
		emit_signal("money_changed", player_money)
		return true
	return false

func advance_day():
	current_day += 1
	emit_signal("day_changed", current_day)
	generate_daily_customers()

func add_to_inventory(item_id: String, quantity: int = 1):
	if inventory.has(item_id):
		inventory[item_id] += quantity
	else:
		inventory[item_id] = quantity

func remove_from_inventory(item_id: String, quantity: int = 1) -> bool:
	if inventory.has(item_id) and inventory[item_id] >= quantity:
		inventory[item_id] -= quantity
		if inventory[item_id] <= 0:
			inventory.erase(item_id)
		return true
	return false

func generate_daily_customers():
	pass

func save_game():
	var save_data = {
		"money": player_money,
		"day": current_day,
		"reputation": shop_reputation,
		"inventory": inventory,
		"unlocked_stories": unlocked_stories
	}
	var save_file = FileAccess.open("user://savegame.save", FileAccess.WRITE)
	save_file.store_var(save_data)
	save_file.close()

func load_game_data():
	if not FileAccess.file_exists("user://savegame.save"):
		return
	var save_file = FileAccess.open("user://savegame.save", FileAccess.READ)
	var save_data = save_file.get_var()
	save_file.close()

	player_money = save_data.get("money", 100)
	current_day = save_data.get("day", 1)
	shop_reputation = save_data.get("reputation", 0)
	inventory = save_data.get("inventory", {})
	unlocked_stories = save_data.get("unlocked_stories", [])
