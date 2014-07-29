module Sinatra
  module App
    module Routing
      module Documents
        module Delete
          def self.registered(app)
            
            # set uri for Documents
            uri = '/documents'
            
            # DELETE /documents/(0-9)
            app.delete %r{/documents/([a-zA-Z0-9]*)} do
              # get all documents
              document = Model::Document.find(params[:captures].first)
              
              # document not found
              if !document
                halt 404
              end
              
              # delete document
              document.delete
              
              # return success response
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