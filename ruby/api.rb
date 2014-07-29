# get packages
require 'json'
require 'sinatra/base'

# api module
module API
	
	# current version
	version = 'v1'
	
	# global response method
	def respond data
		content_type :json
		data.to_json
	end
	
end