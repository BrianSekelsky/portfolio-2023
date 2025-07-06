const buttons = document.querySelectorAll('.gallery-button');
const cards = document.querySelectorAll('#gallery > *');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;

    // update active state
    buttons.forEach((b) => b.classList.remove('bg-black', 'text-white'));
    button.classList.add('bg-black', 'text-white');

    cards.forEach((card) => {
      if (
        category === 'all' ||
        card.className.toLowerCase().includes(category)
      ) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});