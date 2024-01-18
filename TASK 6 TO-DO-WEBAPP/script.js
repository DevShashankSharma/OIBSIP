const title = document.getElementById("title");
const description = document.getElementById("description");

const addTask = () => {
    const task = {
        title: title.value,
        description: description.value,
    };
    console.log("Hello",task);
}