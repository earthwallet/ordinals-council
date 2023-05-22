export default function handler(request, response) {
    const { name = 'Earth' } = request.query;
    return response.send(`Hello ${name}!`);
  }