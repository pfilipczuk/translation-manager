using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TranslationManager.WebApp.Options;

namespace TranslationManager.WebApp.Controllers
{
    [Route("api/[Controller]")]
    public class AuthController : Controller
    {
        public AuthController(IOptions<GitHubOptions> options, IHttpClientFactory httpClientFactory)
        {
            Options = options;
            HttpClientFactory = httpClientFactory;
        }

        private IOptions<GitHubOptions> Options { get; }
        private IHttpClientFactory HttpClientFactory { get; }

        public async Task<IActionResult> GetToken(string code)
        {
            using (var client = HttpClientFactory.CreateClient())
            {
                client.DefaultRequestHeaders.Accept.Add(MediaTypeWithQualityHeaderValue.Parse("application/json"));
                var query = new QueryBuilder
                {
                    {"client_id",Options.Value.ClientId },
                    {"client_secret", Options.Value.ClientSecret},
                    {"code", code }
                };
                var url = Options.Value.BaseUrl + "access_token" + query;

                var message = await client.GetAsync(url);
                return Content(await message.Content.ReadAsStringAsync());
            }
        }
    }
}