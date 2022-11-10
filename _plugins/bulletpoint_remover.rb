# frozen_string_literal: true

# Turns ==something== in Markdown to <mark>something</mark> in output HTML

Jekyll::Hooks.register [:notes], :post_convert do |doc|
  removeBulletpoints(doc)
end

Jekyll::Hooks.register [:pages], :post_convert do |doc|
  # jekyll considers anything at the root as a page,
  # we only want to consider actual pages
  next unless doc.path.start_with?('_pages/')
  removeBulletpoints(doc)
end

def removeBulletpoints(doc)
  puts doc.content
  
  doc.content.gsub!("/<li>/", "<p>")
  doc.content.gsub!("/</li>/", "</p>")
  doc.content.gsub!(/<li>+([^ ](.*?)?[^ .=]?)<\/li>+/, "<p>\\1</p>")
end