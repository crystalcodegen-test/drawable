module Sinatra
  module App
    module Routing
      module Layers
        module Patch
          def self.registered(app)
            
            # set uri for Layers
            uri = '/layers'
            
             # PATCH /layers/(0-9)
            app.patch %r{/layers/([a-zA-Z0-9]*)} do
              # get layer by id
              layer = Model::Layer.find(params[:captures].first)
              
              # layer not found
              if !layer
                halt 404
              end
              
              # update layer
              layer.name = @request_payload['name']
              layer.save
              
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