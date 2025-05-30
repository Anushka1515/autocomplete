fetch('https://dummyjson.com/products?limit=100&select=title,price,brand,category')
  .then(res => res.json())
  .then(data => {
    const blob = new Blob([JSON.stringify(data.products, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'products.json';
    link.click();
  });
