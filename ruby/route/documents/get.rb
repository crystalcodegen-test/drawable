module Sinatra
  module App
    module Routing
      module Documents
        module Get
          def self.registered(app)
            
            # set uri for Documents
            uri = '/documents'
            
            # GET /documents
            app.get uri do
              # get all documents
              documents = Model::Document.all()
              
              # prepare data
              data = {
                :status => 'success',
                :data => documents
              }
              
              # send data to response
              respond data
            end
            
            # GET /documents/(0-9)
            app.get %r{/documents/([a-zA-Z0-9]*)} do
              # get all documents
              documents = Model::Document.where(:name => params[:captures].first)
              document = documents.first
              
              if !document
                halt 404
              end
              
              data = {
                :status => 'success',
                :data => document,
                :layers => Model::Layer.where(:document_id => document.id).all,
                :objects => Model::Object.where(:document_id => document.id).all
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