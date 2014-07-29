module Sinatra
  module App
    module Routing
      module Objects
        module Delete
          def self.registered(app)
            
            # set uri for Objects
            uri = '/objects'
            
            # DELETE /objects/(0-9)
            app.delete %r{/objects/([a-zA-Z0-9]*)} do
              # get object by id
              object = Model::Object.find(params[:captures].first)
              
              # object not found
              if !object
                halt 404
              end
              
              # delete object
              object.delete
              
              # build response
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