function Create() {
    return (
        <div className="create">
            <h2>Add a new block</h2>
            <form>
                <label>username:</label>
                <input
                    type="text"
                    required
                />
                <label>password:</label>
                <input
                    type="text"
                    required
                />
                <label>student or staff:</label>
                <select>
                    <option value="student">student</option>
                    <option value="staff">staff</option>
                </select>
                <button>login</button>
            </form>
        </div>
    )
}

export default Create