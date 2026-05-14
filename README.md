# WHOIS Proxy Services Collection

A curated collection of **Regular Expressions** designed to identify WHOIS proxy services within the `Registrant Organization` or `Registrant Name` fields of WHOIS data.


## 🛠 Usage & Format

### Data Structure

To ensure easy programmatic consumption, entries are stored in the following format:

`proxy.txt`
```text
# Optional Provider URL
Regex Pattern
Optional Secondary Pattern

```

`proxy.json`
```json
[
  {
    "pattern": [
      "Regex Pattern",
      "Optional Secondary Pattern"
    ],
    "provider": "Optional Provider URL"
  },
  ...
]

```

## 🤝 Contributing

Help keep this library up to date! If you've encountered a new proxy string, follow these steps:

1. **Fork** the repository.
2. **Add** your pattern to the collection.
3. **Test** your regex against actual WHOIS output to avoid false positives.
4. **Open a PR** with a brief note on where the service was spotted (e.g., TLD or Registrar).
