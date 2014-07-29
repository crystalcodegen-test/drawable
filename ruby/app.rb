# load packages
require 'json'
require 'sinatra/base'

# load models
require_relative 'model/document'
require_relative 'model/layer'
require_relative 'model/object'
# load routes for documents
require_relative 'route/documents/delete'
require_relative 'route/documents/get'
require_relative 'route/documents/patch'
require_relative 'route/documents/post'
# load routes for layers
require_relative 'route/layers/delete'
require_relative 'route/layers/get'
require_relative 'route/layers/patch'
require_relative 'route/layers/post'
# load routes for objects
require_relative 'route/objects/delete'
require_relative 'route/objects/get'
require_relative 'route/objects/patch'
require_relative 'route/objects/post'

# main app
class App < Sinatra::Base
	
	# define api version
	MAJOR_VERSION = 1
	MINOR_VERSION = 0
	
	# connect to mongodb
	configure do
		MongoMapper.database = 'drawables'
	end
	
	helpers do
		def version_compatible? (nums)
			return MAJOR_VERSION == nums[0].to_i && MINOR_VERSION >= nums[1].to_i
		end
	end
	
	# check api version
	before '*' do
	  version_regex = %r{^/v(\d)\.(\d)}
		version = version_regex.match(params[:captures].first)
		if !version
			halt 400, "Invalid URI"
		end
		
		if version_compatible?(version.captures)
			request.path_info = request.path_info.match(version_regex).post_match
		else
			halt 400, "Unknown/Outdated Version"
		end
	end
	
	# handle 404
	not_found do
		"Unknown Resource"
	end
	
	# enable session
	enable :sessions
	
	before do
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    response.headers["Access-Control-Allow-Methods"] = "DELETE, GET, PATCH, POST, PUT"
      
    if request.request_method == 'OPTIONS'
      halt 200
    end
    
    if request.request_method == 'PATCH' || request.request_method == 'POST'
      request.body.rewind
      @request_payload = JSON.parse request.body.read
    end
  end
	
	# global respond
	def respond data
		content_type :json
		data.to_json
	end
	
	# register documents
	register Sinatra::App::Routing::Documents::Delete
	register Sinatra::App::Routing::Documents::Get
	register Sinatra::App::Routing::Documents::Patch
	register Sinatra::App::Routing::Documents::Post
	
	# register layers
  register Sinatra::App::Routing::Layers::Delete
  register Sinatra::App::Routing::Layers::Get
  register Sinatra::App::Routing::Layers::Patch
  register Sinatra::App::Routing::Layers::Post
	
	# register objects
	register Sinatra::App::Routing::Objects::Delete
	register Sinatra::App::Routing::Objects::Get
	register Sinatra::App::Routing::Objects::Patch
	register Sinatra::App::Routing::Objects::Post
	
end

# run app
App::run!