extends Control

@onready var start_button = $VBoxContainer/StartButton
@onready var continue_button = $VBoxContainer/ContinueButton
@onready var settings_button = $VBoxContainer/SettingsButton
@onready var quit_button = $VBoxContainer/QuitButton

func _ready():
	start_button.pressed.connect(_on_start_pressed)
	continue_button.pressed.connect(_on_continue_pressed)
	settings_button.pressed.connect(_on_settings_pressed)
	quit_button.pressed.connect(_on_quit_pressed)

	# 检查是否有存档
	continue_button.disabled = not FileAccess.file_exists("user://savegame.save")

func _on_start_pressed():
	# 开始新游戏
	get_tree().change_scene_to_file("res://scenes/shop.tscn")

func _on_continue_pressed():
	# 继续游戏
	get_tree().change_scene_to_file("res://scenes/shop.tscn")

func _on_settings_pressed():
	# 打开设置
	pass

func _on_quit_pressed():
	get_tree().quit()
