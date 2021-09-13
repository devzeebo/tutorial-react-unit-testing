export default () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve(Symbol.for('data'));
    } else {
      reject(new Error('Better luck next time'));
    }
  }, 10000);
});
