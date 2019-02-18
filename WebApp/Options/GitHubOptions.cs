using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TranslationManager.WebApp.Options
{
    public class GitHubOptions
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }

        public string BaseUrl { get; set; } = "https://github.com/login/oauth/";
    }
}
