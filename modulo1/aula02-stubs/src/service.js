class Service {
  async makeRequest(url) {
    const data = await (await fetch(url)).json();

    return data;

  }

  async getPlanets(url) {
    const data = await this.makeRequest(url);
    return {
      name: data.name,
      surfaceWater: data.surface_water,
      appeardIn: data.films.length
    }
  }
}

module.exports = Service;