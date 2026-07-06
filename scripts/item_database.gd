extends Node

var items: Dictionary = {}

func _ready():
	load_items()

func load_items():
	items = {
		"cassette_tape": {
			"id": "cassette_tape",
			"name": "磁带",
			"description": "1980年代的音乐载体，承载着青春的回忆",
			"base_price": 15,
			"rarity": "common",
			"era": "1980s",
			"category": "media"
		},
		"vinyl_record": {
			"id": "vinyl_record",
			"name": "黑胶唱片",
			"description": "经典的音乐收藏品",
			"base_price": 30,
			"rarity": "uncommon",
			"era": "1960s",
			"category": "media"
		},
		"pocket_watch": {
			"id": "pocket_watch",
			"name": "怀表",
			"description": "维多利亚时代的精致计时器",
			"base_price": 50,
			"rarity": "rare",
			"era": "victorian",
			"category": "accessory"
		},
		"hologram_toy": {
			"id": "hologram_toy",
			"name": "全息玩具",
			"description": "2050年代儿童的最爱",
			"base_price": 40,
			"rarity": "uncommon",
			"era": "2050s",
			"category": "toy"
		},
		"ancient_book": {
			"id": "ancient_book",
			"name": "古籍",
			"description": "失传已久的珍贵典籍",
			"base_price": 100,
			"rarity": "legendary",
			"era": "ancient",
			"category": "book"
		},
		"polaroid_camera": {
			"id": "polaroid_camera",
			"name": "拍立得相机",
			"description": "能即时成像的神奇相机",
			"base_price": 45,
			"rarity": "uncommon",
			"era": "1990s",
			"category": "electronics"
		}
	}

func get_item(item_id: String) -> Dictionary:
	return items.get(item_id, {})

func get_items_by_era(era: String) -> Array:
	var result = []
	for item_id in items.keys():
		if items[item_id]["era"] == era:
			result.append(items[item_id])
	return result

func get_items_by_rarity(rarity: String) -> Array:
	var result = []
	for item_id in items.keys():
		if items[item_id]["rarity"] == rarity:
			result.append(items[item_id])
	return result
