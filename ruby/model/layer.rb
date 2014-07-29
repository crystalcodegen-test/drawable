# get packages
require 'mongo_mapper'

module Model
	class Layer
	
		include MongoMapper::Document
		
		belongs_to :document, :class_name => 'Model::Document'
		
		key :created_at, Time
		key :deleted_at, Time
		key :name, String
		key :updated_at, Time
		
		many :objects, :class_name => 'Model::Object'
		
	end
end