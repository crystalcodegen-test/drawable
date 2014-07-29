# get packages
require 'mongo_mapper'

module Model
  class Document
  
  	include MongoMapper::Document
  	
  	key :created_at, Time
  	key :deleted_at, Time
  	key :name, String, :unique => true
  	key :protected, String
  	key :updated_at, Time
  	key :url, String
  	
  	many :layers, :class_name => 'Model::Layer'
  	many :objects, :class_name => 'Model::Object'
  	
  end
end