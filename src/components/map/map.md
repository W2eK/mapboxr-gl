# MapboxrGL

### mapboxgl.Map

| Prop              | Required | Type                 | Default                              | Dynamic | Description                                                 |
| ----------------- | :------: | -------------------- | ------------------------------------ | :-----: | ----------------------------------------------------------- |
| **`accessToken`** |    ✅    | `string`             | `null`                               |   ❌    | _Mapbox API access token for mapbox-gl-js_                  |
| **`mapStyle`**    |    ❌    | `string` or `object` | `mapbox://styles/mapbox/streets-v11` |   ✅    | The Mapbox style. A string url or a Mapbox GL style object. |

### Events

### Own props

| Prop           | Required | Type                 | Default                              | Dynamic | Description                                                 |
| -------------- | :------: | -------------------- | ------------------------------------ | :-----: | ----------------------------------------------------------- |
| **`cursor`**   |    ❌    | `string`             | `false`                              |   ❌    | _Mapbox API access token for mapbox-gl-js_                  |
| **`mapStyle`** |    ❌    | `string` or `object` | `mapbox://styles/mapbox/streets-v11` |   ✅    | The Mapbox style. A string url or a Mapbox GL style object. |

- ❌ — Can't be updated -> Re-render Component
- ✅ — Updated