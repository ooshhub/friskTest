<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="icon" href="{{asset('favicon.ico')}}" />
  <title>friskTest</title>
  {{-- react-refresh preamble - do not load in production --}}
  @if (env('APP_ENV') != 'production')
    <script type="module">
      import RefreshRuntime from 'http://localhost:5173/@react-refresh'
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script>
  @endif
  {{-- Load Vite resources --}}
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
  <div id="progress-bar"></div>
  <div id="app"></div>
</body>
</html>
