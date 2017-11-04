using System;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using Newtonsoft.Json.Linq;

namespace CoreCRM.ExampleClient
{
    class Program
    {
        static void Main(string[] args)
        {
            Task.Run(async () =>
            {
                // discover endpoints from metadata
                Console.WriteLine("discover endpoints from metadata");
                
                var disco = await DiscoveryClient.GetAsync("http://localhost:5000");
                if (disco.IsError)
                {
                    Console.WriteLine(disco.Error);
                    return;
                }
            
                // request token
                Console.WriteLine("request token");
 
                var tokenClient = new TokenClient(disco.TokenEndpoint, "client", "secret");
                var tokenResponse = await tokenClient.RequestClientCredentialsAsync("api1");

                if (tokenResponse.IsError)
                {
                    Console.WriteLine(tokenResponse.Error);
                    return;
                }
 
                Console.WriteLine(tokenResponse.Json);
            
                // call api
                Console.WriteLine("call api");
 
                var client = new HttpClient();
                client.SetBearerToken(tokenResponse.AccessToken);

                var response = await client.GetAsync("http://localhost:5000/api/v1/default/index");
                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine(response.StatusCode);
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(content);
                }
            }).Wait();
        }
    }
}