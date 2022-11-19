<template>
    <div class="gap-2 mt-4 bg-vp-purple p-2 rounded-lg shadow-lg">
        <button @click="joinRoomChat" type="button" class="btn w-full">join room chat</button>
    </div>
</template>

<script setup>
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
 
window.Pusher = Pusher

const echo = ref()

onMounted(() => {
    setupEcho()
})

function joinRoomChat() {
    console.log('Joining room: ' + 'ptest')
    echo.value.private('ptest')
    .listen('.private.channel.message', (e) => {
        console.log('I never get called!')
        console.log(e)
    });
}

function setupEcho() {
    const token = useCookie('XSRF-TOKEN').value
    const config = useRuntimeConfig()
    if (!echo.value) {
        echo.value = new Echo({
        authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                const response = $fetch(config.baseURL + '/broadcasting/auth', {
                    async onRequest({ request, options }) {
                    options.method = 'post'
                    options.body = {
                        socket_id: socketId,
                        channel_name: channel.name
                    }
                    options.headers = {'X-XSRF-TOKEN': token,
                    'Accept': 'application/json',
                    'X-Socket-ID': echo.value.socketId(),
                    },
                    options.credentials = 'include'
                    },
                    async onResponseError({ request, response, options }) {
                        console.log(response + response.status)
                    },
                })
                console.log(response)
            }
        };
        },
        broadcaster: 'pusher',
        key: 'app-key',
        cluster: 'mt1',
        wsHost: 'localhost',
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        encrypted: true,
        auth: {
            headers: {'X-XSRF-TOKEN': token,
                       'Accept': 'application/json',
            },
        },
        enabledTransports: ['ws', 'wss'],
    });
    }
}

</script>