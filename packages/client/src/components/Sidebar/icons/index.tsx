import * as React from "react";

function Home(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={27}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.626.547a2 2 0 012.748 0l9.688 9.158c.6.566.938 1.356.938 2.18v11.14a3 3 0 01-3 3h-4a3 3 0 01-3-3.002v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5a3 3 0 01-3 3H3a3 3 0 01-3-3v-11.14c0-.824.34-1.614.94-2.18l9.686-9.16v.004zM12 1.999l-9.688 9.16a1 1 0 00-.312.724v11.14a1 1 0 001 1h4a1 1 0 001-1v-5a3 3 0 013-3h2a3 3 0 013 3v5a1 1 0 001 1h4a1 1 0 001-1v-11.14a1.001 1.001 0 00-.312-.726L12 1.999z"
        fill="#000"
      />
    </svg>
  );
}

function Game(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={27}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a2 2 0 100 4 2 2 0 000-4zM8 4a4 4 0 118 0 4 4 0 01-8 0zM.923 14c.51 0 .923.394.923.881l.003 6.28c0 .022 0 .045-.002.067-.001.01.001.02.006.03a.053.053 0 00.023.02l7.562 3.41c.8.362 1.675.549 2.561.549.886 0 1.76-.187 2.562-.549l7.56-3.41a.051.051 0 00.025-.025.087.087 0 00.008-.04.818.818 0 01-.002-.052v-6.28c0-.486.413-.881.923-.881s.923.395.923.882v6.257c.012.27-.038.54-.147.79-.18.414-.514.75-.938.942h-.002l-7.562 3.411A8.153 8.153 0 0112 27a8.154 8.154 0 01-3.35-.718l-7.562-3.41h-.001a1.87 1.87 0 01-.83-.73 1.749 1.749 0 01-.253-1.009L0 14.882C0 14.395.413 14 .923 14z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.676 11.4l-7.8 3.358a.992.992 0 01-.017.007.036.036 0 00.007.06l.007.003 7.562 3.662c.804.388 1.68.59 2.567.59.886 0 1.762-.202 2.566-.59l7.562-3.662.003-.002a.036.036 0 00.015-.013.037.037 0 00-.016-.053l-.004-.002-7.8-3.357a5.875 5.875 0 00-4.652 0zm-8.461 1.564L8.97 9.627a7.655 7.655 0 016.064 0l7.796 3.356.002.001c.339.145.63.388.837.702a2.016 2.016 0 01.046 2.145c-.195.323-.475.58-.807.74h-.002l-7.559 3.66a7.68 7.68 0 01-3.345.77 7.68 7.68 0 01-3.345-.77l-7.56-3.66a1.905 1.905 0 01-.809-.737 2.014 2.014 0 01.046-2.152 1.896 1.896 0 01.88-.716z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6c.552 0 1 .407 1 .91v8.18c0 .503-.448.91-1 .91s-1-.407-1-.91V6.91c0-.503.448-.91 1-.91z"
        fill="#000"
      />
    </svg>
  );
}

function Share(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.417 16.375a4.381 4.381 0 002.969-1.172l7.885 4.506a4.434 4.434 0 101.292-2.163L8.678 13.04c.083-.314.128-.64.136-.967l7.747-4.428a4.395 4.395 0 10-1.438-3.237c.005.363.055.725.148 1.075l-7.16 4.09a4.409 4.409 0 10-3.694 6.802z"
        fill="#000"
      />
    </svg>
  );
}

function Guide(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.132 2.804l3.74 13.951a3.784 3.784 0 01-2.676 4.633l-8.635 2.315a3.781 3.781 0 01-4.635-2.675L4.188 7.077a3.783 3.783 0 012.676-4.633L15.5.129a3.783 3.783 0 014.632 2.675zM11.276 6.96a1.376 1.376 0 10-2.657.71 1.376 1.376 0 102.658-.712v.002zm-7.102 5.386l2.424 9.038c.238.896.715 1.71 1.378 2.358l-.609-.034a3.782 3.782 0 01-3.58-3.975l.387-7.387zm-1.272-2.033l-.488 9.348c-.051.96.165 1.874.583 2.67l-.57-.222A3.784 3.784 0 01.251 17.22l2.651-6.908z"
        fill="#000"
      />
    </svg>
  );
}

function Login(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={25}
      height={23}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 15.89L17.11 11 11 6.112V9.78H0v2.444h11v3.667z"
        fill="#000"
      />
      <path
        d="M13.445 0a10.924 10.924 0 00-7.778 3.223l1.729 1.728a8.5 8.5 0 016.05-2.507 8.5 8.5 0 016.05 2.507 8.501 8.501 0 012.506 6.05 8.501 8.501 0 01-2.507 6.05 8.5 8.5 0 01-6.05 2.507 8.5 8.5 0 01-6.05-2.507l-1.728 1.728a10.924 10.924 0 007.778 3.223c2.94 0 5.702-1.145 7.779-3.223a10.925 10.925 0 003.222-7.778c0-2.94-1.145-5.702-3.223-7.778A10.923 10.923 0 0013.446 0z"
        fill="#000"
      />
    </svg>
  );
}

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.075 6.75A5.218 5.218 0 006.825 12a5.218 5.218 0 005.25 5.25 5.218 5.218 0 005.25-5.25 5.218 5.218 0 00-5.25-5.25zm0 9c-2.1 0-3.75-1.65-3.75-3.75s1.65-3.75 3.75-3.75 3.75 1.65 3.75 3.75-1.65 3.75-3.75 3.75z"
        fill="#000"
      />
      <path
        d="M23.1 9.525L21 8.85l-.45-1.125 1.05-1.95c.225-.45.15-1.05-.225-1.425l-1.8-1.8a1.261 1.261 0 00-1.425-.225l-1.95 1.05-1.125-.45-.675-2.1C14.25.375 13.8 0 13.275 0h-2.55c-.525 0-.975.375-1.05.9L9 3c-.45.075-.825.225-1.2.45L5.85 2.4a1.261 1.261 0 00-1.425.225l-1.8 1.8C2.25 4.8 2.175 5.4 2.4 5.85l.975 1.875c-.15.375-.3.825-.45 1.2l-2.1.675c-.45.15-.825.6-.825 1.125v2.55c0 .525.375.975.9 1.125l2.1.675.45 1.125-1.05 1.95c-.225.45-.15 1.05.225 1.425l1.8 1.8c.375.375.975.45 1.425.225l1.95-1.05 1.125.45.675 2.175c.15.45.6.825 1.125.825h2.55c.525 0 .975-.375 1.125-.825L15.075 21l1.125-.45 1.95 1.05c.45.225 1.05.15 1.425-.225l1.8-1.8c.375-.375.45-.975.225-1.425l-1.05-1.95.45-1.125 2.175-.675c.45-.15.825-.6.825-1.125v-2.55c0-.525-.375-1.05-.9-1.2zm-.6 3.525l-2.7.825-.075.375-.675 1.575-.225.375 1.35 2.475-1.5 1.5-2.475-1.35-.375.225a7.12 7.12 0 01-1.575.675l-.375.075-.825 2.7h-2.1l-.825-2.7-.375-.075-1.575-.675-.375-.225-2.475 1.35-1.5-1.5 1.35-2.475-.225-.375a7.12 7.12 0 01-.675-1.575l-.075-.375-2.7-.825v-2.1l2.55-.75.15-.375c.15-.6.375-1.125.675-1.65L5.1 7.8 3.825 5.325l1.5-1.5 2.4 1.35.375-.225c.525-.3 1.05-.525 1.65-.675l.375-.15.825-2.625h2.1l.825 2.625.375.15a7.12 7.12 0 011.575.675l.375.225 2.475-1.35 1.5 1.5-1.35 2.475.225.375c.3.525.525 1.05.675 1.575l.075.375 2.7.825v2.1z"
        fill="#000"
      />
    </svg>
  );
}

export { Home, Game, Share, Guide, Login, Settings };
