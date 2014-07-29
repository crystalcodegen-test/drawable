module Sinatra
  module App
    module Routing
      module Documents
        module Post
          def self.registered(app)
            
            # set uri for Documents
            uri = '/documents'
            
            # POST /documents
            app.post uri do
              # create new document
              document = Model::Document.new(
                :name => @request_payload['name'],
                :created_at => Time.new
              )
              document.save
              
              # set Created status
              status 201
              
              # prepare data
              data = {
                :status => 'success',
                :data => document
              }
              
              # send data to response
              respond data
            end
            
          end
        end
      end
    end
  end
end