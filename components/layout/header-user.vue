<script lang="ts" setup>
const user = useLogtoUser();

watchEffect(() => {
    console.log(user);
});
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                class="relative h-8 w-8 rounded-full"
                variant="ghost"
            >
                <Avatar class="h-8 w-8">
                    <AvatarImage
                        v-if="user"
                        :alt="`@${user.name}`"
                        :src="user.picture"
                    />
                    <AvatarFallback v-if="user">{{ user.name }}</AvatarFallback>
                    <AvatarFallback v-else>GUEST</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="end"
            class="w-56"
        >
            <DropdownMenuLabel
                v-if="user"
                class="flex font-normal"
            >
                <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">{{ user.name }}</p>
                    <p class="text-xs leading-none text-muted-foreground">{{ user.username }}</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator v-if="user" />
            <DropdownMenuItem
                v-if="user"
                as-child
            >
                <a href="/auth/logout">Logout</a>
            </DropdownMenuItem>
            <DropdownMenuGroup v-else>
                <DropdownMenuItem as-child>
                    <a href="/auth/login">Login</a>
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                    <a href="/auth/login">Registry</a>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style lang="scss" scoped></style>
