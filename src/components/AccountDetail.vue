<template>
  <div style="margin: auto; text-align: center;">
    <div v-if="loading"><h1>LOADING</h1></div>
    <div v-if="!loading">
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li>
          <label for="username">Username</label>
          <br>
          <input id="username" type="text" v-model="username"> 
          <p v-if="errors.username" style="color: red;">{{ errors.username }}</p>
        </li>
        <li>
          <label for="email">Email</label>
          <br>
          <input id="email" type="text" v-model="email">  
          <p v-if="errors.email" style="color: red;">{{ errors.email }}</p>
        </li>
        <li v-if="mode === EMode.CREATE">
          <label for="password">Password</label>
          <br>
          <input id="password" type="text" v-model="password">
          <p v-if="errors.password" style="color: red;">{{ errors.password }}</p>
        </li>
      </ul>    
      <div v-if="mode !== EMode.DETAIL">
        <button
          type="button"
          :class="saveButtonClass"
          @click="saveEdits"
        >
          {{ saveButtonText }}
        </button>
        <button
          type="button"
          class="btn btn-secondary mr-2 ml-2"
          @click="cancelEdits"
        >
          Cancel
        </button>
      </div>  
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, toRef, type Ref, computed } from 'vue';
import { useServiceStore } from "../stores";
import { 
  DEFAULT_ACCOUNT, 
  type AccountDTO, 
  type AccountCreateDTO, 
  type AccountUpdateInterface,
  EAccountDetailMode as EMode,
} from "../dto";
import { useRoute, useRouter } from 'vue-router';
import { apimanager } from '@/api';
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute();
const router = useRouter();
const serviceStore = useServiceStore();

type Mode = EMode;

interface Props {
  id?: number,
  edit?: boolean,
  mode?: Mode,
}
const props = withDefaults(defineProps<Props>(), { 
  mode: EMode.DETAIL, 
  id: 0 
});
const mode = toRef(props.mode);
const id: Ref<number> = props.mode === EMode.EDIT && !props.id ?   
  ref(Number(route.params.id)) : toRef(props.id); 

const validationSchema = object({
  email: string().required().email(),
  username: string().required(),
  password: string().required(),
})
const { defineField, validate, errors } = useForm({validationSchema});
const [email] = defineField('email');
const [username] = defineField('username');
const [password] = defineField('password');

const loading: Ref<boolean> = ref(false);
const saveButtonText: Ref<string> = ref("");
const saveButtonClass: Ref<string> = ref("");

const date_joined: Ref<string> = ref("");
const last_login: Ref<string> = ref("");
const is_admin: Ref<boolean> = ref(false);
const is_active: Ref<boolean> = ref(false)
const is_staff: Ref<boolean> = ref(false);
const is_superuser: Ref<boolean> = ref(false);


function setAccount(account: AccountDTO) {
  email.value = account.email;
  username.value = account.username;
  password.value = account.password;
  date_joined.value = account.date_joined;
  last_login.value = account.last_login;
  is_admin.value = account.is_admin;
  is_active.value = account.is_active;
  is_staff.value = account.is_staff;
  is_superuser.value = account.is_superuser;
  id.value = account.id;
}

async function init() {
  loading.value = true;
  switch(mode.value) {
    case "Create":
      initCreate();
      break;
    case "Edit":
      await initEdit();
      break;
    case "Detail": 
      await initDetail();
      break;
    default:
      mode.value = EMode.DETAIL;
      await initDetail();
      break;
  }
  loading.value = false;
}

function initCreate(): void {
  saveButtonText.value = "Create";
  saveButtonClass.value = "btn btn-success";
  setAccount(DEFAULT_ACCOUNT);
}

async function initEdit(): Promise<void> {
  saveButtonText.value = "Update";
  saveButtonClass.value = "btn btn-primary"
  await serviceStore.setAccountDTOById(id.value);
  setAccount(serviceStore.AccountDTO);
}
async function initDetail(): Promise<void> {
  await serviceStore.setAccountDTOById(id.value);
  setAccount(serviceStore.AccountDTO);
}

async function saveEdits() {
  const validation = await validate();
  if (!validation.valid) {
    return;
  }
  switch (mode.value) {
    case EMode.CREATE:
      createAccount();
      break;
    case EMode.EDIT:
      editAccount();
      break;
    default:
      break;
  }
}

async function createAccount() {
  const payload: AccountCreateDTO = {
    username: username.value,
    email: email.value,
    password: password.value,
  }
  const res = await serviceStore.createAccount(payload);
  if (res?.status===201) {
    await router.push('/login');
    toast.success("Account Created");
  }
}

function editAccount() {
  const payload: AccountUpdateInterface = {
    email: email.value,
    username: username.value,
    password: password.value,
    id: id.value,
  }
  apimanager.updateAccount(payload).then((res) => {
    console.log(res);
  })
}


function cancelEdits() {
  init();
}

init();
</script>