extends Resource
class_name Customer

@export var id: String
@export var name: String
@export var era: String
@export var portrait: String
@export var story_title: String
@export var backstory: String
@export var dialogue_lines: Array[String]
@export var desired_items: Array[String]
@export var reward_money: int
@export var reward_reputation: int
@export var unlock_condition: String = ""

func _init(
	p_id: String = "",
	p_name: String = "",
	p_era: String = "",
	p_story_title: String = "",
	p_backstory: String = "",
	p_dialogue: Array[String] = [],
	p_desired_items: Array[String] = [],
	p_reward_money: int = 0,
	p_reward_reputation: int = 0
):
	id = p_id
	name = p_name
	era = p_era
	story_title = p_story_title
	backstory = p_backstory
	dialogue_lines = p_dialogue
	desired_items = p_desired_items
	reward_money = p_reward_money
	reward_reputation = p_reward_reputation
