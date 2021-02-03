//TODO: Test This
//TODO: Add this as a callable from CDN. Import then set variable call_type to the call type
var call_type;
var button = ".button-42";
var url = "http://app.maximentoring.com";

if (!button) {
  alert(`Please set the button class value\n (i.e. var button="button42")`);
}
if (!call_type) {
  alert(
    `Please set the call type value\n (i.e. var call_type="ask")\nOptions are: "ask", "free", "bonus"`
  );
}
if (!url) {
  alert(`Please set the url\n(i.e. var url="https://app.maximentoring.com")`);
}

if (button && call_type && url) {
  document
    .querySelectorAll(button)
    .forEach((e) => e.addEventListener("click", schedule));

  //Set Agent Cookie
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("a")) {
    let agent = urlParams.get("a");
    document.cookie = `agent=${agent}; expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/`;
  }

  //Schedule Call Function
  function schedule(obj, call_type) {
    const call_param = "ct=" + call_type;
    let agent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("agent"))
      .split("=")[1];

    if (agent) {
      url += `?a=${agent}&${call_param}`;
    } else if (window.location.search) {
      url += window.location.search + "&" + call_param;
    } else {
      url += "?" + call_param;
    }
    window.location.href = url;
  }
}
