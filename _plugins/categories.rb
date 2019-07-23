#
# Heavealy inspired from https://github.com/jguyomard/jekyll-paginate-categories
#

module Jekyll
  module Paginate
    module Categories

      class CategoryPage < Jekyll::Page
        # Initialize a new Category Page
        def initialize(site, base, category)
          layout = site.config['paginate_category_layout'] || 'category.html'
          layouts_base = site.config['layouts_dir'] || '_layouts'
          super(site, base, layouts_base, layout)
          process('index.html')
          
          category_title_prefix = site.config['category_title_prefix'] || 'Category: '
          self.data['title'] = "#{category_title_prefix}#{category}"
          self.data['category'] = category

          category_path = site.config['paginate_category_basepath'] || '/categories/:name/'
          category_path = category_path.sub(':name', Utils.slugify(category.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, ''), :mode => 'ascii'))
          self.data['pathinfo'] = category_path.sub(/(\/)+$/,'')
          
        end
      end
       
      
      # Per-category pagination.
      # Based on jekyll-paginate.
      # 
      # paginate_category_basepath: category base path - eg, /category/:name/
      # paginate_path: will be concatenated with paginate_category - eg /page/:num/
      # paginate_category_layout: The layout name of the category layout (default: categories.html)
      class CategoryPagination < Generator
        safe true

        # Generate paginated pages if necessary.
        #
        # site - The Site.
        #
        # Returns nothing.
        def generate(site)
          if site.config['paginate_category_basepath']
            for category in site.categories.keys
              paginate_category(site, category)
            end
          end
        end
 

        # Do the blog's posts pagination per category. Renders the index.html file into paginated 
        # directories (see paginate_category_basepath and paginate_path config) for these categories, 
        # e.g.: /categories/my-category/page2/index.html, /categories/my-category/page3/index.html, etc.
        #
        # site     - The Site.
        # category - The category to paginate.
        # all_posts - The posts to paginate.
        #
        # Returns nothing.
        def paginate_category(site, category)

          
          all_posts = site.site_payload['site']['categories'][category]
          category_path = site.config['paginate_category_basepath'] || '/categories/:name/'
          category_path = category_path.sub(':name', Utils.slugify(category.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, ''), :mode => 'ascii'))
          
          # Count pages
          nb_pages = Pager.calculate_pages(all_posts, site.config['paginate'].to_i)

          # Create pages
          (1..nb_pages).each do |current_num_page|
            # Split posts into pages
            pager = Pager.new(site, current_num_page, all_posts, nb_pages)
            pager.update_paginate_paths(site, category_path)

            # Create new page, based on category layout
            newpage = CategoryPage.new(site, site.source, category)
            newpage.pager = pager 
            newpage.dir = Pager.paginate_path_category(site, current_num_page, category_path)
            # print newpage.dir
            site.pages << newpage
          end
        end
      end

      class Pager < Jekyll::Paginate::Pager
        # Update paginator.previous_page_path and next_page_path to add category path
        #
        # site            - the Jekyll::Site object
        # category_path   - category path, eg /category/web/
        #
        # Returns nothing.
        def update_paginate_paths(site, category_path)
          if @page > 1
            @previous_page_path = category_path.sub(/(\/)+$/,'') + @previous_page_path
          end
          if @page < @total_pages
            @next_page_path = category_path.sub(/(\/)+$/,'') + @next_page_path
          end
        end

        # Static: Return the pagination path of the page
        #
        # site     - the Jekyll::Site object
        # num_page - the pagination page number
        # paginate_path - the explicit paginate path, if provided
        #
        # Returns the pagination path as a string
        def self.paginate_path_category(site, num_page, category_path, paginate_path = site.config['paginate_path'])
          return nil if num_page.nil?
          return category_path if num_page <= 1
          format = category_path.sub(/(\/)+$/,'') + paginate_path
          format = format.sub(':num', num_page.to_s)
        
          ensure_leading_slash(format)
        end
      end

    end
  end
end