module Sinatra
  module App
    module Routing
      module Layers
        module Post
          def self.registered(app)
            
            # set uri for Layers
            uri = '/layers'
            
            # POST /layers
            app.post uri do
              # get document
              document = Model::Document.find(@request_payload['document'])
              
              # create new layer
              layer = Model::Layer.new(
                :created_at => Time.new,
                :document => document,
                :name => @request_payload['name']
              )
              layer.save
              
              # set Created status
              status 201
              
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