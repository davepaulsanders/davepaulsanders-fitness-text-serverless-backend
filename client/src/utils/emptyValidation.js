module.exports = (data) => {
  for (let input in data) {
    if (data[input] === "" && input !== "_id" && input !== "mediaLink") {
      return false;
    }
  }
};
