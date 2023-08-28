import { shallowMount } from "@vue/test-utils";
import TaskItem from '../../src/components/TaskItem.vue'

describe('TaskItem', () => {
    it('renders task content', () => {
      const task = { id: 1, content: 'Sample Task', isDone: false, dueDate: '2023-08-28' };
      const wrapper = shallowMount(TaskItem, {
        propsData: { task },
      });


      expect(wrapper.text()).toContain('Sample Task');
    });

    it('toggles task completion', async () => {
        const task = { id: 1, content: 'Sample Task', isDone: false, dueDate: '2023-08-28' };
        const wrapper = shallowMount(TaskItem, {
          propsData: { task },
          mocks: {
            $store: {
              dispatch: jest.fn(),
            },
          },
        });

        // Simulate clicking the checkbox
        await wrapper.find('input[type="checkbox"]').setChecked(true);

        // Asserting that the toggleCompleteTask action was called with the task
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('toggleCompleteTask', task);
      });

      it('displays overdue status for incomplete tasks', () => {
        const task = { id: 1, content: 'Sample Task', isDone: false, dueDate: '2023-08-24' };
        const wrapper = shallowMount(TaskItem, {
          propsData: { task },
          data() {
            return {
              currentDay: new Date('2023-08-28'),
            };
          },
        });

        // Asserting that the overdue status is displayed
        expect(wrapper.find('.text-red-500').exists()).toBe(true);
      });

  });