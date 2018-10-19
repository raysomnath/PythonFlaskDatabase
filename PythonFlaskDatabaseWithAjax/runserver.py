from PythonFlaskDatabase import app
import os

# This line helps to see changes made in html files while debugging, else changes will not be loaded. :(

# ALSO : app.config["DEBUG"] = True — Starts the debugger. With this line, if your code is malformed,
# you’ll see an error when you visit your app.
# Otherwise you’ll only see a generic message such as Bad Gateway in the browser when there’s a problem with your code.

app.config["DEBUG"] = True

if __name__ == '__main__':
    import os
    HOST = os.environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555
    app.run(HOST, PORT)
