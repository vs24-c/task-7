class RequredManager {
  static async handlerSubmit(route, body) {
    try {
      if (!route || !body) {
        throw new Error('Invalid request parameters');
      }
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  static async deleteUser(id) {
    const respons = await fetch(`/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    window.location.reload(true)
    const data = await respons.json()
    
    return data;
  }
}


