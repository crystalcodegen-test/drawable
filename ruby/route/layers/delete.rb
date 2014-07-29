module Sinatra
  module App
    module Routing
      module Layers
        module Delete
          def self.registered(app)
            
            # set uri for Layers
            uri = '/layers'
            
            # DELETE /layers/(0-9)
            app.delete %r{/layers/([a-zA-Z0-9]*)} do
              # get layer by id
              layer_id = params[:captures].first
              layer = Model::Layer.find(layer_id)
              
              # layer not found
              if !layer
                halt 404
              end
              
              # delete layer
              layer.delete
              
              # prepare response
              response = {
                :status => 'success'
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