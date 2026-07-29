# Redirect Map

| Retired route | Destination | Reason |
| --- | --- | --- |
| `/index.htm` | `/` | Legacy homepage entry point replaced by the canonical HTML route. |
| `/preview.html` | `/` | Legacy preview page removed. |
| `/#about`, `/#skills`, `/#projects`, `/#contact` | Relevant new routes | Legacy one-page anchors are superseded by `/about/`, `/#expertise`, `/work/` and `/contact/`. |

`index.htm` is a static compatibility redirect. `_redirects` supports Netlify/Cloudflare-style hosts. Configure equivalent redirects in the host if it does not read `_redirects`.
