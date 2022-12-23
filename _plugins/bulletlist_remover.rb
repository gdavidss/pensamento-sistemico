# frozen_string_literal: true
# Removes bullet list from markdown blocks 

Jekyll::Hooks.register [:notes], :post_convert do |doc|
  removeBulletlist(doc)
end

Jekyll::Hooks.register [:pages], :post_convert do |doc|
  # jekyll considers anything at the root as a page,
  # we only want to consider actual pages
  next unless doc.path.start_with?('_pages/')
  removeBulletlist(doc)
end

def removeBulletlist(doc)
  # Remove the first <ul></ul> enclosing tags, and convert all <li> to <p>
  ul_tag_opening_len = 4
  ul_tag_closing_len = 7
  begin
  # code that may raise an exception
    doc.content = doc.content[ul_tag_opening_len..doc.content.length-ul_tag_closing_len] 
    doc.content.gsub!(/<li>/, "<p>")
    doc.content.gsub!(/<\/li>/, "</p>")
  rescue StandardError => e
    # code to handle the exception
    puts "An exception occurred: #{e}"
  end
end
