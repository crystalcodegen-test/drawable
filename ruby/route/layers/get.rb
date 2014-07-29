module Sinatra
  module App
    module Routing
      module Layers
        module Get
          def self.registered(app)
            
            # set uri for Layers
            uri = '/layers'
            
            # GET /layers
            app.get uri do
              # get all layers
              layers = Model::Layer.all()
              
              # prepare data
              data = {
                :status => 'success',
                :data => layers
              }
              
              # send response
              respond data
            end
            
            # GET /layers/(0-9)
            app.get %r{/layers/([a-zA-Z0-9]*)} do
              # get layer by id
              layer = Model::Layer.find(params[:captures].first)
              
              # layer not found
              if !layer
                halt 404
              end
              
              # prepare response
              response = {
                :status => 'success',
                :data => layer
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