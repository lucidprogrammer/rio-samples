
const sampleAppMappings = [
    {
      "app": "some",
      "org": "customer1",
      "route": "/some"
    },
    {
      "app": "some",
      "org": "customer2",
      "route": "/some"
  
    }
  ];
const getRoute = ({'org':org,'app':app},routeDefinition) =>
{
    const result = routeDefinition.filter((entry)=> entry.app === app && entry.org == org)
    if(result.length === 1){
        return result[0]
    }
    return undefined
}

module.exports = {
    sampleAppMappings,
    getRoute
}