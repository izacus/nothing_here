var bitbucket = (function(){
  function escapeHtml(str) {
    return $('<div/>').text(str).html();
  }
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].links.html.href+'">'+repos[i].name+'</a><p>'+escapeHtml(repos[i].description||'')+'</p></li>';
    }
    t.innerHTML = fragment;
  }
  return {
    showRepos: function(options){
      var pagelen = 10;
      if (options.bitbucket_repo_load_count)
        pagelen = options.bitbucket_repo_load_count;

      var showrepos = 5;
      if (options.bitbucket_repo_show_count)
        showrepos = options.bitbucket_repo_show_count;

      $.ajax({
          url: "https://bitbucket.org/api/2.0/repositories/"+options.user
        , dataType: 'jsonp'
        , error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(data) {
          
          var repos = [];
          if (!data || !data.values) { return; }
          for (var i = 0; i < data.values.length; i++) {
            if (options.skip_forks && data.values[i].parent) { continue; }
            repos.push(data.values[i]);
          }

          repos.sort(function(a, b) {
              if (a.updated_on < b.updated_on)
                return 1;
              if (a.updated_on > b.updated_on)
                return -1;

              return 0;
          });

          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        }
      });
    }
  };
})();
