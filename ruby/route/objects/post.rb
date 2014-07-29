module Sinatra
  module App
    module Routing
      module Objects
        module Post
          def self.registered(app)
            
            # set uri for Objects
            uri = '/objects'
            
            # POST /objects
            app.post uri do
              # get document
              document = Model::Document.find(@request_payload['document'])
              
              # get layer
              layer = Model::Layer.find(@request_payload['layer'])
              
              # create new object
              object = Model::Object.new(
                :color => @request_payload['color'],
                :document => document,
                :height => @request_payload['height'],
                :layer => layer,
                :left => @request_payload['left'],
                :name => @request_payload['name'],
                :tool => @request_payload['tool'],
                :top => @request_payload['top'],
                :width => @request_payload['width'],
                :created_at => Time.new
              )
              object.save
              
              # set Created status
              status 201
              
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