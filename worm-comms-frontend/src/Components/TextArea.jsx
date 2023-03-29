const TextArea = () => {
    return (
        <div class="flex bottom">
            <textarea class="border-2 w-5/6"
                id="messageInput" name="messageInput" placeholder="Type your message here"></textarea>
            <button class="border-2 w-1/12">Send</button>
            <button class="border-2 w-1/12">Toggle ChatGPT</button>
        </div>
    )
}

export default TextArea