# URL Unpacker

URL Unpacker is a browser-based utility for decoding and visualizing complex URIs/URLs and their parameters, including nested URLs and fragments.

![URL Unpacker - screenshot example](.doc/images/url-unpacker-print.png)

## Features

- Input any URI/URL and see its protocol, host, path, parameters, and fragment.
- Recursively decodes parameters that are themselves URIs/URLs.
- Visualizes each level with color-coded borders for clarity.
- Responsive, modern UI with semantic HTML.
- No backend required—runs entirely in the browser.

## Usage

1. Open `index.html` in your browser.
2. Paste a URI/URL into the input field.
3. Click "Decode & Unpack" to see the structured breakdown below.

### Example URI

```text
https://example.com/api?user=alice&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c&redirect=https%3A%2F%2Fauth.example.com%2Fcallback%3Fstate%3Dxyz%26code%3Dabc123%26next%3Dhttps%253A%252F%252Fdashboard.example.com%252Fhome%253Fsession%253Dlongsessionid%2526ref%253Dhttps%25253A%25252F%25252Fother.example.com%25252Fdeep%25253Ffoo%25253Dbar%252526baz%25253Dqux&data=https%3A%2F%2Fdata.example.com%2Finfo%3Fhash%3D1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef%26url%3Dhttps%253A%252F%252Fsub.example.com%252Fsubpath%253Fparam%253Dvalue%2526subparam%253Dsubvalue#fragmentpart?fragparam=fragvalue&fragurl=https%3A%2F%2Ffrag.example.com%2Ffragpath%3Ffparam%3Dfvalue%26furl%3Dhttps%253A%252F%252Fnestedfrag.example.com%252Fnested%253Fnestedparam%253Dnestedvalue
```

## Development

- All code is in the `UrlUnpacker` folder.
- No dependencies required.
- To contribute, fork the repo and submit a pull request.

## License

This project is licensed under the Apache License, Version 2.0. Any public use, distribution, or derivative work must mention the main creator, Henry F. Isaquiel, in documentation, credits, or about sections.

See the full license text at [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
