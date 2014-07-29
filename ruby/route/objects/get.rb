module Sinatra
  module App
    module Routing
      module Objects
        module Get
          def self.registered(app)
            
            # set uri for Objects
            uri = '/objects'
            
            # GET /objects
            app.get uri do
              # get all objects
              objects = Model::Object.all()
              
              # prepare data
              data = {
                :status => 'success',
                :data => objects
              }
              
              # send response
              respond data
            end
            
            # GET /objects/(0-9)
            app.get %r{/objects/([a-zA-Z0-9]*)} do
              # get object by id
              object = Model::Object.find(params[:captures].first)
              
              # object not found
              if !object
                halt 404
              end
              
              # prepare response
              response = {
                :status => 'success',
                :data => object
              }
              
              # send response
              respond response
            end
            
          end
        end
      end
    end
  end
end