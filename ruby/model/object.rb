# get packages
require 'mongo_mapper'

module Model
	class Object
	
		include MongoMapper::Document
		
		belongs_to :document, :class_name => 'Model::Document'
		belongs_to :layer, :class_name => 'Model::Layer'
		
		key :color, String
		key :created_at, Time
		key :deleted_at, Time
		key :height, Integer
		key :left, Integer
		key :name, String
		key :tool, String
		key :top, Integer
		key :updated_at, Time
		key :width, Integer
		
	end
end