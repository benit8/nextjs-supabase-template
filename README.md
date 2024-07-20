This is a [Next.js](https://nextjs.org/) project enhanced with a [Supabase](https://supabase.com) backed authentication using SSR. User interface is made using [shadcn-ui](https://ui.shadcn.com).

## Getting Started

### Supabase

You can either write your supabase project details into `.env.production` or start the local development stack:

```shell
supabase start
```

Then create a `.env.local` file and input the local stack infos:

```shell
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

These are the default-generated parameters, adapt them to you needs.

### NextJS

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CI

A complete CI for GitLab is provided (linting, Docker image build, release and deployment).

The CI expects you to work using a `develop` and `master` branches, for (respectfully) development and releases.

The built docker images are stored on the GitLab Container Registry by default.

The deployment job is targeted for VPSs using SSH, it may not fit your usage. If so, you must define a name for your container in the job variables and define some CI/CD variables:

- `SSH_HOST`: hostname or ip address of the VPS.
- `SSH_PORT`: port for the ssh service on the VPS.
- `SSH_USER`: name of the user created for deployment.
- `WORK_DIR`: where the application lives on the VPS (eg. `/opt/my-app`).
- `SSH_PRIVATE_KEY` (file): ssh private key of the deployment user.
- `SSH_KNOWN_HOSTS` (file): contents of ~/.ssh/authorized_keys (should not be empty).

For file variables, add a newline at the end of the contents before saving them.

On your VPS, create a deployment user with:

```shell
useradd -m -s /bin/bash deploy
```

Add it to the `sudo` & `docker` groups:

```shell
adduser deploy sudo && adduser deploy docker
```

Generate a SSH key for it:

```shell
ssh-kegen -t rsa -b 4096
```

You may rename it according to your project, eg. `id_rsa-example.com[.pub]`.

Generate the authorized key file:

```shell
ssh-keyscan <VPS IP>
```

## Known issues

- When a user clicks on the confirmation link after resetting their password, the code exchange does not provide a session to the user. Thus they get automatically redirected to the login page.
