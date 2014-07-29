module Sinatra
  module App
    module Routing
      module Documents
        module Patch
          def self.registered(app)
          
            # set uri for Documents
            uri = '/documents'
            
            # PATCH /documents/(0-9)
            app.patch %r{/documents/([a-zA-Z0-9]*)} do
              # get all documents
              documents = Model::Document.where(:name => params[:captures].first)
              document = documents.first
              
              if !document
                halt 404
              end
              
              document.name = @request_payload['name']
              document.save
              
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