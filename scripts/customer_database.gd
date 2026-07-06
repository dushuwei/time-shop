extends Node

var customers: Dictionary = {}

func _ready():
	load_customers()

func load_customers():
	customers = {
		"nostalgic_teen": {
			"id": "nostalgic_teen",
			"name": "李明",
			"era": "1980s",
			"story_title": "青春的告白",
			"backstory": "1985年的高中生，暗恋同班的女生已经两年了。毕业在即，他想用一盒特别的磁带录下自己的心声。",
			"dialogue": [
				"你好...我想找一盒磁带。",
				"不是普通的那种，我想要能录音的，音质要好的。",
				"我...我要录一些话给一个很重要的人。",
				"谢谢！我一定会鼓起勇气的！"
			],
			"desired_items": ["cassette_tape"],
			"reward_money": 25,
			"reward_reputation": 10,
			"unlock_condition": ""
		},
		"future_elder": {
			"id": "future_elder",
			"name": "王奶奶",
			"era": "2050s",
			"story_title": "童年的玩具",
			"backstory": "来自2050年的老人，她的孙女对古董玩具很感兴趣，想找一个全息玩具送给她，让她了解那个时代。",
			"dialogue": [
				"小店主，你这里有未来的东西吗？",
				"我孙女总说我们那个年代的玩具太老土了。",
				"我想让她看看，其实每个时代都有属于自己的美好。",
				"太好了！这个她一定会喜欢的！"
			],
			"desired_items": ["hologram_toy"],
			"reward_money": 60,
			"reward_reputation": 15,
			"unlock_condition": "day >= 3"
		},
		"victorian_gentleman": {
			"id": "victorian_gentleman",
			"name": "爱德华先生",
			"era": "victorian",
			"story_title": "遗失的时光",
			"backstory": "维多利亚时代的绅士，他的怀表在一次意外中损坏了，那是他父亲留给他的唯一遗物。",
			"dialogue": [
				"日安，尊敬的店主。",
				"我在寻找一块怀表，它对我意义重大。",
				"我父亲曾说，时间是我们唯一无法挽回的财富。",
				"万分感激！这让我重新找回了与父亲的联系。"
			],
			"desired_items": ["pocket_watch"],
			"reward_money": 80,
			"reward_reputation": 20,
			"unlock_condition": "reputation >= 25"
		},
		"photographer": {
			"id": "photographer",
			"name": "张小雨",
			"era": "1990s",
			"story_title": "瞬间的永恒",
			"backstory": "90年代的摄影爱好者，她想用拍立得记录下城市改造前的老街区。",
			"dialogue": [
				"听说这里能找到各种稀奇的东西？",
				"我需要一台拍立得相机，数码的太没感觉了。",
				"有些东西，只有即时成像才能捕捉到那种真实感。",
				"完美！我要去记录那些即将消失的美好了！"
			],
			"desired_items": ["polaroid_camera"],
			"reward_money": 70,
			"reward_reputation": 18,
			"unlock_condition": "day >= 5"
		}
	}

func get_customer(customer_id: String) -> Dictionary:
	return customers.get(customer_id, {})

func get_available_customers(current_day: int, reputation: int) -> Array:
	var available = []
	for customer_id in customers.keys():
		var customer = customers[customer_id]
		var condition = customer.get("unlock_condition", "")

		if condition == "" or check_condition(condition, current_day, reputation):
			available.append(customer)

	return available

func check_condition(condition: String, current_day: int, reputation: int) -> bool:
	if condition.begins_with("day >= "):
		var required_day = int(condition.substr(7))
		return current_day >= required_day
	elif condition.begins_with("reputation >= "):
		var required_rep = int(condition.substr(14))
		return reputation >= required_rep
	return true
