module Sinatra
  module App
    module Routing
      module Objects
        module Patch
          def self.registered(app)
            
            # set uri for Objects
            uri = '/objects'
            
             # PATCH /objects/(0-9)
            app.patch %r{/objects/([a-zA-Z0-9]*)} do
              # get object by id
              object = Model::Object.find(params[:captures].first)
              
              # object not found
              if !object
                halt 404
              end
              
              # update object
              if @request_payload['left']
                object.left = @request_payload['left']
              end
              if @request_payload['top']
                object.top = @request_payload['top']
              end
              object.save
              
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